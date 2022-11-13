package com.catering.rest.db.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.ShoppingListModel;
import com.catering.rest.db.repositories.ShoppingListRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShoppingListService {
    @Autowired
    private final ShoppingListRepository shoppingListRepo;

	public List<ShoppingListModel> getShoppingListById(Integer id) {
		return shoppingListRepo.generateShoppingListById(id);
	}

	public List<ShoppingListModel> getShoppingListByOrderId(Integer id) {
		return shoppingListRepo.generateShoppingListForOrderId(id);
	}

	public List<ShoppingListModel> mergeOrders(Integer[] orderIds) {
		return shoppingListRepo.mergeOrders(orderIds[0], orderIds[1]);
	}

	public List<ShoppingListModel> removeOrder(Integer orderId) {
		return shoppingListRepo.removeOrder(orderId);
	}
}
