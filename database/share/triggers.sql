/* ============================= */
/* TRIGGERS FOR recipes.ing_cost */


DROP PROCEDURE IF EXISTS update_recipes_ing_cost_by_ing_id;
DELIMITER $$
CREATE PROCEDURE update_recipes_ing_cost_by_ing_id(IN ING_ID int)
BEGIN
	/* make a table with recipies to be updated */
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


/* when update ingredients.price */
DROP TRIGGER IF EXISTS recipes_after_update_ingredient;
DELIMITER $$
CREATE TRIGGER recipes_after_update_ingredient
AFTER UPDATE ON ingredients FOR EACH ROW
BEGIN
	CALL update_recipes_ing_cost_by_ing_id(OLD.ID);
END $$
DELIMITER ;

/* when UPDATE recipe_details.quantity */
DROP TRIGGER IF EXISTS recipes_after_update_details;
DELIMITER $$
CREATE TRIGGER recipes_after_update_details
AFTER UPDATE ON recipes_details FOR EACH ROW
BEGIN
	CALL update_recipes_ing_cost_by_recipe_id(OLD.ID_recipe);
END $$
DELIMITER ;

/* when INSERT recipe_details */
DROP TRIGGER IF EXISTS recipes_after_insert_details;
DELIMITER $$
CREATE TRIGGER recipes_after_insert_details
AFTER INSERT ON recipes_details FOR EACH ROW
BEGIN
	CALL update_recipes_ing_cost_by_recipe_id(NEW.ID_recipe);
END $$
DELIMITER ;

/* when DELETE recipe_details */
DROP TRIGGER IF EXISTS recipes_after_delete_details;
DELIMITER $$
CREATE TRIGGER recipes_after_delete_details
AFTER DELETE ON recipes_details FOR EACH ROW
BEGIN
	CALL update_recipes_ing_cost_by_recipe_id(OLD.ID_recipe);
END $$
DELIMITER ;

