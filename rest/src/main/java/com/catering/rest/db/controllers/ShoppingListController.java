package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.ShoppingListModel;
import com.catering.rest.db.repositories.ShoppingListRepository;
import com.catering.rest.db.services.ShoppingListService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/shoppingList")
public class ShoppingListController {
	@Autowired
	private final ShoppingListService shoppingListService;

	@ResponseBody
	@GetMapping("/{id}")
	List<ShoppingListModel> getShoppingListById(@PathVariable Integer id) {
		return shoppingListService.getShoppingListById(id);
	}

	@ResponseBody
	@PostMapping("/byOrderId")
	List<ShoppingListModel> getShoppingListByOrderId(@RequestBody Integer id) {
		return shoppingListService.getShoppingListByOrderId(id);
	}

	@ResponseBody
	@PostMapping("/merge")
	List<ShoppingListModel> mergeOrders(@RequestBody Integer[] orderIds) {
		return shoppingListService.mergeOrders(orderIds);
	}

	@ResponseBody
	@PostMapping("/remove")
	List<ShoppingListModel> removeOrder(@RequestBody Integer orderId) {
		return shoppingListService.removeOrder(orderId);
	}
}
