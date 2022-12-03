package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.ShoppingListModel;
import com.catering.rest.db.services.ShoppingListService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/shoppingList")
public class ShoppingListController {
	@Autowired
	private final ShoppingListService shoppingListService;

	@ResponseBody
	@GetMapping("/byOrderId/{id}")
	List<ShoppingListModel> getShoppingListByOrderId(@PathVariable Integer id) {
		return shoppingListService.getShoppingListByOrderId(id);
	}
}
