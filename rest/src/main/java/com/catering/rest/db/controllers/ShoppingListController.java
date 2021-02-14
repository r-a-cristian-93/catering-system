package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.ShoppingListModel;
import com.catering.rest.db.repositories.ShoppingListRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/shoppingList")
public class ShoppingListController {
	ShoppingListRepository shoppingListRepo;
	
	@ResponseBody
	@GetMapping("/{id}")
	List<ShoppingListModel> getShoppingListById(@PathVariable Integer id) {
		return shoppingListRepo.generateShoppingListById(id);
	}
	
	@ResponseBody
	@PostMapping("/byOrderId")
	List<ShoppingListModel> getShoppingListByOrderID(@RequestBody Integer id) {
		return shoppingListRepo.generateShoppingListForOrderId(id);
	}
	
	@ResponseBody
	@PostMapping("/merge")
	List<ShoppingListModel> mergeMergeOrders(@RequestBody Integer[] orderIds) {
		return shoppingListRepo.mergeOrders(orderIds[0], orderIds[1]);		
	}
	
	@ResponseBody
	@PostMapping("/remove")
	List<ShoppingListModel> removeOrder(@RequestBody Integer orderId) {
		return shoppingListRepo.removeOrder(orderId);		
	}
}
