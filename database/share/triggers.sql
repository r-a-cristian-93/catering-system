USE catering;

/* ============================= */
/* PROCEDURE order.status and dates */

DROP PROCEDURE IF EXISTS order_next_step;
DELIMITER $$
CREATE PROCEDURE order_next_step(IN ORDER_ID int)
BEGIN
	DECLARE placemnetDate datetime;
	DECLARE supplyDate datetime;
	DECLARE productionDate datetime;
	DECLARE preparingDate datetime;
	DECLARE shippingDate datetime;
	DECLARE PREV_STATUS varchar(20);

	SELECT status INTO PREV_STATUS FROM orders WHERE ID = ORDER_ID;

	IF (PREV_STATUS = "preluata") THEN
		UPDATE orders SET status = "aprovizionata" WHERE ID = ORDER_ID;
		UPDATE orders SET supply_date = CURRENT_TIMESTAMP WHERE ID = ORDER_ID;
	END IF;

	IF (PREV_STATUS = "aprovizionata") THEN
		UPDATE orders SET status = "preparata" WHERE ID = ORDER_ID;
		UPDATE orders SET production_date = CURRENT_TIMESTAMP WHERE ID = ORDER_ID;
	END IF;

	IF (PREV_STATUS = "preparata") THEN
		UPDATE orders SET status = "pregatita" WHERE ID = ORDER_ID;
		UPDATE orders SET preparing_date = CURRENT_TIMESTAMP WHERE ID = ORDER_ID;
	END IF;

	IF (PREV_STATUS = "pregatita") THEN
		UPDATE orders SET status = "expediata" WHERE ID = ORDER_ID;
		UPDATE orders SET shipping_date = CURRENT_TIMESTAMP WHERE ID = ORDER_ID;
	END IF;

	SELECT * FROM orders WHERE ID = ORDER_ID;

END $$
DELIMITER ;

/* ============================= */
/* TRIGGER FOR order canceling*/

DROP TRIGGER IF EXISTS order_cancel;
DELIMITER $$
CREATE TRIGGER order_cancel
BEFORE UPDATE ON orders FOR EACH ROW
BEGIN
	IF (NEW.status = "anulata" AND OLD.status <> "anulata") THEN
		SET NEW.cancel_date = CURRENT_TIMESTAMP;
	END IF;
END $$
DELIMITER ;



/* ============================= */
/* TRIGGERS FOR recipes.ing_cost */

DROP PROCEDURE IF EXISTS update_recipes_ing_cost_by_ing_id;
DELIMITER $$
CREATE PROCEDURE update_recipes_ing_cost_by_ing_id(IN ING_ID int)
BEGIN
	/* make a table with recipes to be updated */
	DROP TEMPORARY TABLE IF EXISTS recipes_to_update;
	CREATE TEMPORARY TABLE recipes_to_update(ID INT);
	INSERT INTO recipes_to_update SELECT DISTINCT ID_recipe FROM recipes_details WHERE ID_ingredient=ING_ID;

	/* recalculate recipes ing_cost */
	DROP TEMPORARY TABLE IF EXISTS recipes_new_price;
	CREATE TEMPORARY TABLE recipes_new_price(ID int, ing_cost double);
	INSERT INTO recipes_new_price
	SELECT r.ID, SUM(d.quantity*i.price) ing_cost
		FROM recipes_details d
		LEFT JOIN ingredients i ON d.ID_ingredient = i.ID
		LEFT JOIN recipes r ON d.ID_recipe = r.ID
		RIGHT JOIN recipes_to_update u ON r.ID=u.ID
		GROUP BY d.ID_recipe;

	/* update recipes ing_cost */
	UPDATE recipes r
	RIGHT JOIN recipes_new_price n ON r.ID=n.ID
	SET r.ing_cost = n.ing_cost;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS update_recipes_ing_cost_by_recipe_id;
DELIMITER $$
CREATE PROCEDURE update_recipes_ing_cost_by_recipe_id(IN RECIPE_ID int)
BEGIN
	/* recalculate recipes ing_cost */
	DROP TEMPORARY TABLE IF EXISTS recipes_new_price;
	CREATE TEMPORARY TABLE recipes_new_price(ID int, ing_cost double);
	INSERT INTO recipes_new_price
	SELECT r.ID, SUM(d.quantity*i.price) ing_cost
		FROM recipes_details d
		LEFT JOIN ingredients i ON d.ID_ingredient = i.ID
		LEFT JOIN recipes r ON d.ID_recipe = r.ID
		WHERE d.ID_recipe = RECIPE_ID
		GROUP BY d.ID_recipe;

	/* update recipes ing_cost */
	UPDATE recipes r
	RIGHT JOIN recipes_new_price n ON r.ID=n.ID
	SET r.ing_cost = n.ing_cost;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS update_ingredient_price_history;
DELIMITER $$
CREATE PROCEDURE update_ingredient_price_history(IN ING_ID int, IN ING_PRICE double)
BEGIN
	DECLARE HAS_TODAY_RECORD BOOLEAN;
	SELECT EXISTS (SELECT ID FROM ingredients_price_history WHERE date=CURDATE()) INTO HAS_TODAY_RECORD;

	IF (HAS_TODAY_RECORD) THEN
		UPDATE ingredients_price_history SET price = ING_PRICE WHERE ID_ingredient=ING_ID AND date=CURDATE();
	ELSE
		INSERT INTO ingredients_price_history(ID_ingredient, price) values(ING_ID, ING_PRICE);
	END IF;
END $$
DELIMITER ;

/* when update ingredients.price */
DROP TRIGGER IF EXISTS recipes_after_update_ingredient;
DELIMITER $$
CREATE TRIGGER recipes_after_update_ingredient
AFTER UPDATE ON ingredients FOR EACH ROW
BEGIN
	IF (OLD.price <> NEW.price) THEN
		CALL update_recipes_ing_cost_by_ing_id(OLD.ID);
		CALL update_ingredient_price_history(OLD.ID, NEW.price);
	END IF;
END $$
DELIMITER ;

/* when UPDATE recipes_details.quantity */
DROP TRIGGER IF EXISTS recipes_after_update_details;
DELIMITER $$
CREATE TRIGGER recipes_after_update_details
AFTER UPDATE ON recipes_details FOR EACH ROW
BEGIN
	CALL update_recipes_ing_cost_by_recipe_id(OLD.ID_recipe);
END $$
DELIMITER ;

/* when INSERT recipes_details */
DROP TRIGGER IF EXISTS recipes_after_insert_details;
DELIMITER $$
CREATE TRIGGER recipes_after_insert_details
AFTER INSERT ON recipes_details FOR EACH ROW
BEGIN
	CALL update_recipes_ing_cost_by_recipe_id(NEW.ID_recipe);
END $$
DELIMITER ;

/* when DELETE recipes_details */
DROP TRIGGER IF EXISTS recipes_after_delete_details;
DELIMITER $$
CREATE TRIGGER recipes_after_delete_details
AFTER DELETE ON recipes_details FOR EACH ROW
BEGIN
	CALL update_recipes_ing_cost_by_recipe_id(OLD.ID_recipe);
END $$
DELIMITER ;




/* ============================= */
/* TRIGGERS FOR orders.ing_cost */


DROP PROCEDURE IF EXISTS update_orders_ing_cost_by_ing_id;
DELIMITER $$
CREATE PROCEDURE update_orders_ing_cost_by_ing_id(IN RECIPE_ID int)
BEGIN
	/* make a table with orders to be updated */
	DROP TEMPORARY TABLE IF EXISTS orders_to_update;
	CREATE TEMPORARY TABLE orders_to_update(ID INT);
	INSERT INTO orders_to_update SELECT DISTINCT ID_order FROM orders_details WHERE ID_recipe=RECIPE_ID;

	/* recalculate orders ing_cost */
	DROP TEMPORARY TABLE IF EXISTS orders_new_price;
	CREATE TEMPORARY TABLE orders_new_price(ID int, ing_cost double);
	INSERT INTO orders_new_price
	SELECT o.ID, SUM(d.servings*r.ing_cost) ing_cost
		FROM orders_details d
		LEFT JOIN recipes r ON d.ID_recipe = r.ID
		LEFT JOIN orders o ON d.ID_order = o.ID
		RIGHT JOIN orders_to_update u ON o.ID=u.ID
		GROUP BY d.ID_order;

	/* update recipes ing_cost */
	UPDATE orders o
	RIGHT JOIN orders_new_price n ON o.ID=n.ID
	SET o.ing_cost = n.ing_cost;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS update_orders_ing_cost_by_order_id;
DELIMITER $$
CREATE PROCEDURE update_orders_ing_cost_by_order_id(IN ORDER_ID int)
BEGIN
	/* recalculate orders ing_cost */
	DROP TEMPORARY TABLE IF EXISTS orders_new_price;
	CREATE TEMPORARY TABLE orders_new_price(ID int, ing_cost double);
	INSERT INTO orders_new_price
	SELECT o.ID, SUM(d.servings*r.ing_cost) ing_cost
		FROM orders_details d
		LEFT JOIN recipes r ON d.ID_recipe = r.ID
		LEFT JOIN orders o ON d.ID_order = o.ID
		WHERE d.ID_order = ORDER_ID
		GROUP BY d.ID_order;

	/* update recipes ing_cost */
	UPDATE orders o
	RIGHT JOIN orders_new_price n ON o.ID=n.ID
	SET o.ing_cost = n.ing_cost;
END $$
DELIMITER ;


/* when update recipes.ing_cost */
DROP TRIGGER IF EXISTS orders_after_update_recipe;
DELIMITER $$
CREATE TRIGGER orders_after_update_recipe
AFTER UPDATE ON recipes FOR EACH ROW
BEGIN
	IF !(OLD.ing_cost <=> NEW.ing_cost) THEN
		CALL update_orders_ing_cost_by_ing_id(OLD.ID);
	END IF;
END $$
DELIMITER ;

/* when UPDATE orders_details.servings */
DROP TRIGGER IF EXISTS orders_after_update_details;
DELIMITER $$
CREATE TRIGGER orders_after_update_details
AFTER UPDATE ON orders_details FOR EACH ROW
BEGIN
	CALL update_orders_ing_cost_by_order_id(OLD.ID_order);
END $$
DELIMITER ;

/* when INSERT orders_details */
DROP TRIGGER IF EXISTS orders_after_insert_details;
DELIMITER $$
CREATE TRIGGER orders_after_insert_details
AFTER INSERT ON orders_details FOR EACH ROW
BEGIN
	CALL update_orders_ing_cost_by_order_id(NEW.ID_order);
END $$
DELIMITER ;

/* when DELETE orders_details */
DROP TRIGGER IF EXISTS orders_after_delete_details;
DELIMITER $$
CREATE TRIGGER orders_after_delete_details
AFTER DELETE ON orders_details FOR EACH ROW
BEGIN
	CALL update_orders_ing_cost_by_order_id(OLD.ID_order);
END $$
DELIMITER ;




/* ============================= */
/* TRIGGERS FOR shopping_list */


/* when DELETE orders */
DROP TRIGGER IF EXISTS shopping_list_after_delete_orders;
DELIMITER $$
CREATE TRIGGER shopping_list_after_delete_orders
AFTER DELETE ON orders FOR EACH ROW
BEGIN
	IF NOT EXISTS (SELECT * FROM orders WHERE ID_shopping_list = OLD.ID_shopping_list) THEN
		IF (OLD.ID_shopping_list <> 0) THEN
			DELETE FROM shopping_list WHERE ID = OLD.ID_shopping_list;
		END IF;
	END IF;
END $$
DELIMITER ;

/* when UPDATE orders */
DROP TRIGGER IF EXISTS shopping_list_after_update_orders;
DELIMITER $$
CREATE TRIGGER shopping_list_after_update_orders
AFTER UPDATE ON orders FOR EACH ROW
BEGIN
	IF NOT EXISTS (SELECT * FROM orders WHERE ID_shopping_list = OLD.ID_shopping_list) THEN
		IF (OLD.ID_shopping_list <> 0) THEN
			DELETE FROM shopping_list WHERE ID = OLD.ID_shopping_list;
		END IF;
	END IF;
END $$
DELIMITER ;

/* generate_shopping_list for order */
DROP PROCEDURE IF EXISTS generate_shopping_list_for_order;
DELIMITER $$
CREATE PROCEDURE generate_shopping_list_for_order(IN ORDER_ID int)
BEGIN
	SELECT ROW_NUMBER() OVER() AS "ID", rd.ID_ingredient, SUM(od.servings*rd.quantity) AS quantity
		FROM orders o
		LEFT JOIN orders_details od ON od.ID_Order = o.ID
		LEFT JOIN recipes_details rd ON rd.ID_recipe = od.ID_recipe
		WHERE o.ID = ORDER_ID
		GROUP BY rd.ID_ingredient;
END $$
DELIMITER ;


/* =============================*/
/* orders_report_date */
DROP PROCEDURE IF EXISTS orders_report_placement_date;
DELIMITER $$
CREATE PROCEDURE orders_report_placement_date(IN START_DATE date, IN END_DATE date)
BEGIN
	SELECT DATE(placement_date) as "date", COUNT(*) as "count"
		FROM orders
		WHERE placement_date IS NOT NULL
			AND placement_date >= START_DATE
			AND placement_date <= END_DATE
		GROUP BY DATE(placement_date)
		ORDER BY DATE(placement_date) ASC;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS orders_report_due_date;
DELIMITER $$
CREATE PROCEDURE orders_report_due_date(IN START_DATE date, IN END_DATE date)
BEGIN
	SELECT DATE(due_date) as "date", COUNT(*) as "count"
		FROM orders
		WHERE due_date IS NOT NULL
			AND due_date >= START_DATE
			AND due_date <= END_DATE
		GROUP BY DATE(due_date)
		ORDER BY DATE(due_date) ASC;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS orders_report_cancel_date;
DELIMITER $$
CREATE PROCEDURE orders_report_cancel_date(IN START_DATE date, IN END_DATE date)
BEGIN
	SELECT DATE(cancel_date) as "date", COUNT(*) as "count"
		FROM orders
		WHERE cancel_date IS NOT NULL
			AND cancel_date >= START_DATE
			AND cancel_date <= END_DATE
		GROUP BY DATE(cancel_date)
		ORDER BY DATE(cancel_date) ASC;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS orders_report_shipping_date;
DELIMITER $$
CREATE PROCEDURE orders_report_shipping_date(IN START_DATE date, IN END_DATE date)
BEGIN
	SELECT DATE(shipping_date) as "date", COUNT(*) as "count"
		FROM orders
		WHERE shipping_date IS NOT NULL
			AND shipping_date >= START_DATE
			AND shipping_date <= END_DATE
		GROUP BY DATE(shipping_date)
		ORDER BY DATE(shipping_date) ASC;
END $$
DELIMITER ;




/* ============================= */
/* DEBUG UTILS */


DROP TABLE IF EXISTS debug_var;
CREATE TABLE debug_var (
	ID int NOT NULL auto_increment,
	name varchar(50),
	value int,
	PRIMARY KEY(ID)
);

/* when DELETE orders */

DROP PROCEDURE IF EXISTS log_var;
DELIMITER $$
CREATE PROCEDURE log_var(IN NAME varchar(50), IN VAL int)
BEGIN
	INSERT INTO debug_var(name, value) VALUES(NAME, VAL);
END $$
DELIMITER ;
