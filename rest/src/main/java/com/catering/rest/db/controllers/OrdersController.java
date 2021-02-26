package com.catering.rest.db.controllers;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

import com.catering.rest.Constants;
import com.catering.rest.db.models.ClientModel;
import com.catering.rest.db.models.OrderModel;
import com.catering.rest.db.models.OrdersDetailsModel;
import com.catering.rest.db.models.RecipeModel;
import com.catering.rest.db.models.StatusModel;
import com.catering.rest.db.repositories.ClientsRepository;
import com.catering.rest.db.repositories.OrdersDetailsRepository;
import com.catering.rest.db.repositories.OrdersRepository;
import com.catering.rest.db.repositories.RecipesRepository;
import com.catering.rest.db.repositories.ShoppingListRepository;

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
	private final ShoppingListRepository shoppingListRepo;
	
	@ResponseBody
	@GetMapping
	public Iterable<OrderModel> getOrders() {
		return ordersRepo.findAll();
	}
	
	@ResponseBody
	@PostMapping("/byStatus")
	public List<OrderModel> getOrdersByStatus(@RequestBody StatusModel status){
		return ordersRepo.findByStatus(status);
	}
	
	@ResponseBody
	@PostMapping("/byShoppingListId")
	public List<OrderModel> getOrdersByShoppingListId(@RequestBody Integer shoppingListId) {
		return ordersRepo.findByShoppingListId(shoppingListId);
	}
	
	@ResponseBody
	@PostMapping("/betweenOrderDates")
	public List<OrderModel> getOrdersAfterOrderDate(@RequestBody Map<String, Long> interval){
		Date first = new Date(interval.get("first"));
		Date last = new Date(interval.get("last"));		
		return ordersRepo.findByOrderDateBetween(first, last);
	}
	
	@ResponseBody
	@PostMapping("/betweenDeliveryDates")
	public List<OrderModel> getOrdersBetweenDeliveryDates(@RequestBody Map<String, Long> interval){
		Date first = new Date(interval.get("first"));
		Date last = new Date(interval.get("last"));	
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
		shoppingListRepo.removeOrder(id);					//workaround for MySQL trigger restriction
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
	

	//PAGEABLE
	
	@ResponseBody
	@GetMapping("/allPageable")
	public Page<OrderModel> getOrdersPageable(
			@RequestParam Integer page, 
			@RequestParam Integer size, 
			@RequestParam String prop, 
			@RequestParam String dir) {
		//Sort sort = sortBy(OrderModel.class, prop, dir);
		Sort sort = OrderModel.sortBy(prop, dir);
		return ordersRepo.findAll(PageRequest.of(page, size, sort));
	}
	
	@ResponseBody
	@PostMapping("/byStatusPageable")
	public Page<OrderModel> getOrdersByStatusRange(
			@RequestBody StatusModel status, 
			@RequestParam Integer page, 
			@RequestParam Integer size, 
			@RequestParam String prop, 
			@RequestParam String dir) {
		Sort sort = OrderModel.sortBy(prop, dir);
		return ordersRepo.findByStatus(status, PageRequest.of(page, size, sort));
	}
	
	@ResponseBody
	@PostMapping("/byShoppingListIdPageable")
	public Page<OrderModel> getOrdersByShoppingListIdPageable(@RequestBody Integer shoppingListId, @RequestParam Integer page, @RequestParam Integer size) {
		return ordersRepo.findByShoppingListId(shoppingListId, PageRequest.of(page, size));
	}
	
	@ResponseBody
	@PostMapping("/betweenOrderDatesPageable")
	public Page<OrderModel> getOrdersAfterOrderDatePageable(
			@RequestBody Map<String, Long> interval, 
			@RequestParam Integer page, 
			@RequestParam Integer size, 
			@RequestParam String prop,
			@RequestParam String dir){
		Date first = new Date(interval.get("first"));
		Date last = new Date(interval.get("last"));
		Sort sort = OrderModel.sortBy(prop, dir);
		return ordersRepo.findByOrderDateBetween(first, last, PageRequest.of(page, size, sort));
	}
	
	@ResponseBody
	@PostMapping("/betweenDeliveryDatesPageable")
	public Page<OrderModel> getOrdersBetweenDeliveryDatesPageable(
			@RequestBody Map<String, Long> interval, 
			@RequestParam Integer page, 
			@RequestParam Integer size, 
			@RequestParam String prop, 
			@RequestParam String dir){
		Date first = new Date(interval.get("first"));
		Date last = new Date(interval.get("last"));	
		Sort sort = OrderModel.sortBy(prop, dir);
		return ordersRepo.findByDeliveryDateBetween(first, last, PageRequest.of(page, size, sort));
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
