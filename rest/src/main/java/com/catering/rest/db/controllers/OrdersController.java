package com.catering.rest.db.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.ClientModel;
import com.catering.rest.db.models.OrderModel;
import com.catering.rest.db.models.OrdersDetailsModel;
import com.catering.rest.db.models.RecipeModel;
import com.catering.rest.db.models.StatusModel;
import com.catering.rest.db.repositories.ClientsRepository;
import com.catering.rest.db.repositories.OrdersDetailsRepository;
import com.catering.rest.db.repositories.OrdersRepository;
import com.catering.rest.db.repositories.RecipesRepository;

import lombok.AllArgsConstructor;
	
@RestController
@AllArgsConstructor
@RequestMapping("orders")
@Transactional
public class OrdersController {
	private final OrdersRepository ordersRepo;
	private final OrdersDetailsRepository detailsRepo;	
	private final RecipesRepository recipesRepo;
	private final ClientsRepository clientsRepo;
	
	@ResponseBody
	@GetMapping
	public List<OrderModel> getOrders() {
		return ordersRepo.findAll();
	}
	
	@ResponseBody
	@PostMapping("/byStatus")
	public List<OrderModel> getOrdersByStatus(@RequestBody StatusModel status){
		return ordersRepo.findByStatus(status);
	}
	
	@ResponseBody
	@GetMapping("/betweenOrderDates")
	public List<OrderModel> getOrdersAfterOrderDate(@RequestBody Date first, @RequestBody Date last){
		return ordersRepo.findByOrderDateBetween(first, last);
	}
	
	@ResponseBody
	@GetMapping("/betweenDeliveryDates")
	public List<OrderModel> getOrdersBetweenDeliveryDates(@RequestBody Date first, @RequestBody Date last){
		return ordersRepo.findByDeliveryDateBetween(first, last);
	}		
	
	@ResponseBody
	@PostMapping
	public OrderModel addOrder(@RequestBody OrderModel order) {
		return ordersRepo.save(order);
	}
	
	@ResponseBody
	@GetMapping("/{id}")
	public OrderModel getOrder(@PathVariable Integer id) {
		return ordersRepo.findById(id).get();
	}
	
	@ResponseBody
	@DeleteMapping("/{id}")
	public void deleteOrder(@PathVariable Integer id) {
		ordersRepo.deleteById(id);
	}
	
	@ResponseBody
	@PutMapping("/{id}")
	public OrderModel updateOrder(@PathVariable Integer id, @RequestBody OrderModel order) {
		ClientModel client = order.getClient();
		StatusModel status = order.getStatus();
		Date deliveryDate = order.getDeliveryDate();
		order = ordersRepo.findById(id).get();
		
		if(client!=null) {
			client = clientsRepo.findByName(client.getName());
			order.setClient(client);
		}
		if(status!=null) {
			order.setStatus(status);
		}	
		if(deliveryDate!=null) {
			order.setDeliveryDate(deliveryDate);
		}
		return ordersRepo.save(order);
	}
	
	//ORDER DETAILS
	
	@ResponseBody
	@GetMapping("/{id}/details")
	public List<OrdersDetailsModel> getDetails(@PathVariable Integer id) {
		OrderModel order = ordersRepo.findById(id).get();
		return detailsRepo.findByOrder(order);
	}
	
	@ResponseBody
	@PostMapping("/{id}/details")	
	public OrdersDetailsModel addDetails(@PathVariable Integer id, @RequestBody OrdersDetailsModel details) {
		OrderModel order = ordersRepo.findById(id).get();
		RecipeModel recipe = recipesRepo.findById(details.getRecipe().getId()).get();
		details.setOrder(order);
		details.setRecipe(recipe);
		return detailsRepo.save(details);		
	}
	
	@ResponseBody
	@DeleteMapping("/{id}/details")
	public void deleteDetails(@PathVariable Integer id, @RequestBody OrdersDetailsModel details) {
		OrderModel order = ordersRepo.findById(id).get();
		Integer recipeId = details.getRecipe().getId();
		RecipeModel recipe = recipesRepo.findById(recipeId).get();
		
		details = detailsRepo.findByOrderAndRecipe(order, recipe);
		detailsRepo.delete(details);
	}
	
	@ResponseBody
	@PutMapping("/{id}/details")
	public OrdersDetailsModel updateDetailsServings(@PathVariable Integer id, @RequestBody OrdersDetailsModel details) {
		OrderModel order = ordersRepo.findById(id).get();
		Integer recipeId = details.getRecipe().getId();
		RecipeModel recipe = recipesRepo.findById(recipeId).get();
		Integer servings = details.getServings();
		
		details = detailsRepo.findByOrderAndRecipe(order, recipe);
		details.setServings(servings);
		return detailsRepo.save(details);		
	}
}
