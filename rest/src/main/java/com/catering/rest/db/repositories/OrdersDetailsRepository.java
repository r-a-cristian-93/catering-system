package com.catering.rest.db.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.OrdersDetailsModel;
import com.catering.rest.db.models.RecipeModel;

public interface OrdersDetailsRepository extends JpaRepository<OrdersDetailsModel, Integer> {
	List<OrdersDetailsModel> findByOrderId(Integer orderId);
	OrdersDetailsModel findByOrderIdAndRecipe(Integer orderId, RecipeModel recipe);
	void deleteById(Integer detailsId);
}
