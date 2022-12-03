package com.catering.rest.db.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import com.catering.rest.db.models.OrderModel;
import com.catering.rest.db.models.OrdersDetailsModel;
import com.catering.rest.db.models.StatusModel;
import com.catering.rest.db.services.OrdersService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("orders")
@Transactional
public class OrdersController {
	@Autowired
	private final OrdersService ordersService;

	@ResponseBody
	@GetMapping
	public Iterable<OrderModel> getOrders() {
		return ordersService.getOrders();
	}

	@ResponseBody
	@PostMapping("/byStatus")
	public List<OrderModel> getOrdersByStatus(@RequestBody StatusModel status){
		return ordersService.getOrdersByStatus(status);
	}

	@ResponseBody
	@PostMapping("/byShoppingListId")
	public List<OrderModel> getOrdersByShoppingListId(@RequestBody Integer shoppingListId) {
		return ordersService.getOrdersByShoppingListId(shoppingListId);
	}

	@ResponseBody
	@PostMapping("/betweenOrderDates")
	public List<OrderModel> getOrdersAfterOrderDate(@RequestBody Map<String, Long> interval){
		return ordersService.getOrdersAfterOrderDate(interval);
	}

	@ResponseBody
	@PostMapping("/betweenDeliveryDates")
	public List<OrderModel> getOrdersBetweenDeliveryDates(@RequestBody Map<String, Long> interval){
		return ordersService.getOrdersBetweenDeliveryDates(interval);
	}

	@ResponseBody
	@PostMapping
	public OrderModel addOrder(@RequestBody OrderModel order) {
		return ordersService.addOrder(order);
	}

	@ResponseBody
	@GetMapping("/{id}")
	public OrderModel getOrder(@PathVariable Integer id) {
		return ordersService.getOrder(id);
	}

	@ResponseBody
	@DeleteMapping("/{id}")
	public void deleteOrder(@PathVariable Integer id) {
		ordersService.deleteOrder(id);
	}

	@ResponseBody
	@PutMapping("/{id}")
	public OrderModel updateOrder(@PathVariable Integer id, @RequestBody OrderModel order) {
		return ordersService.updateOrder(id, order);
	}

	@ResponseBody
	@PutMapping("/{id}/nextstep")
	public OrderModel nextStep(@PathVariable Integer id) {
		return ordersService.nextStep(id);
	}


	//PAGEABLE

	@ResponseBody
	@GetMapping("/allPageable")
	public Page<OrderModel> getOrdersPageable(
			@RequestParam Integer page,
			@RequestParam Integer size,
			@RequestParam String prop,
			@RequestParam String dir) {
		return ordersService.getOrdersPageable(page, size, prop, dir);
	}

	@ResponseBody
	@PostMapping("/byStatusPageable")
	public Page<OrderModel> getOrdersByStatusRange(
			@RequestBody StatusModel status,
			@RequestParam Integer page,
			@RequestParam Integer size,
			@RequestParam String prop,
			@RequestParam String dir) {
		return ordersService.getOrdersByStatusRange(status, page, size, prop, dir);
	}

	@ResponseBody
	@PostMapping("/byShoppingListIdPageable")
	public Page<OrderModel> getOrdersByShoppingListIdPageable(@RequestBody Integer shoppingListId, @RequestParam Integer page, @RequestParam Integer size) {
		return ordersService.getOrdersByShoppingListIdPageable(shoppingListId, page, size);
	}

	@ResponseBody
	@PostMapping("/betweenOrderDatesPageable")
	public Page<OrderModel> getOrdersAfterOrderDatePageable(
			@RequestBody Map<String, Long> interval,
			@RequestParam Integer page,
			@RequestParam Integer size,
			@RequestParam String prop,
			@RequestParam String dir) {
		return ordersService.getOrdersAfterOrderDatePageable(interval, page, size, prop, dir);
	}

	@ResponseBody
	@PostMapping("/betweenDeliveryDatesPageable")
	public Page<OrderModel> getOrdersBetweenDeliveryDatesPageable(
			@RequestBody Map<String, Long> interval,
			@RequestParam Integer page,
			@RequestParam Integer size,
			@RequestParam String prop,
			@RequestParam String dir) {
		return ordersService.getOrdersBetweenDeliveryDatesPageable(interval, page, size, prop, dir);
	}


	//ORDER DETAILS

	@ResponseBody
	@GetMapping("/{id}/details")
	public List<OrdersDetailsModel> getDetails(@PathVariable Integer id) {
		return ordersService.getDetails(id);
	}

	@ResponseBody
	@PostMapping("/{id}/details")
	public OrdersDetailsModel addDetails(@PathVariable Integer id, @RequestBody OrdersDetailsModel details) {
		return ordersService.addDetails(id, details);
	}

	@ResponseBody
	@DeleteMapping("/{id}/details")
	public void deleteDetails(@PathVariable Integer id, @RequestBody OrdersDetailsModel details) {
		ordersService.deleteDetails(id, details);
	}

	@ResponseBody
	@PutMapping("/{id}/details")
	public OrdersDetailsModel updateDetailsServings(@PathVariable Integer id, @RequestBody OrdersDetailsModel details) {
		return ordersService.updateDetailsServings(id, details);
	}
}
