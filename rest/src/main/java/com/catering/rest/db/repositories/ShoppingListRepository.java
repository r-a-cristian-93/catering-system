package com.catering.rest.db.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.catering.rest.db.models.ShoppingListModel;

public interface ShoppingListRepository extends JpaRepository<ShoppingListModel, Integer> {
	@Query(value = "CALL generate_shopping_list_for_order(?1);", nativeQuery = true)
	List<ShoppingListModel> generateShoppingListForOrderId(Integer orderId);
}