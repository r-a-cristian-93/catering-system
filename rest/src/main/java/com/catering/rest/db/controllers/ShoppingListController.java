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
	List<ShoppingListModel> mergeShoppingList(@RequestBody Integer[] orderIds) {
		System.out.println(orderIds[0] + " and " + orderIds[1]);
		return shoppingListRepo.mergeShoppingList(orderIds[0], orderIds[1]);		
	}
}
