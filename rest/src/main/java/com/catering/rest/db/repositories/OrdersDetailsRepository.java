package com.catering.rest.db.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.OrderModel;
import com.catering.rest.db.models.OrdersDetailsModel;
import com.catering.rest.db.models.RecipeModel;

public interface OrdersDetailsRepository extends JpaRepository<OrdersDetailsModel, Integer> {
	List<OrdersDetailsModel> findByOrder(OrderModel order);
	OrdersDetailsModel findByOrderAndRecipe(OrderModel order, RecipeModel recipe);
}
