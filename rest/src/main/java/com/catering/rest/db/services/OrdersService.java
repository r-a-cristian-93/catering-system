package com.catering.rest.db.services;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrdersService {
    @Autowired
    private final OrdersRepository ordersRepo;
    @Autowired
	private final OrdersDetailsRepository detailsRepo;
    @Autowired
	private final RecipesRepository recipesRepo;
    @Autowired
	private final ClientsRepository clientsRepo;
    @Autowired
	private final ShoppingListRepository shoppingListRepo;

	public Iterable<OrderModel> getOrders() {
		return ordersRepo.findAll();
	}

	public List<OrderModel> getOrdersByStatus(StatusModel status) {
		return ordersRepo.findByStatus(status);
	}

	public List<OrderModel> getOrdersByShoppingListId(Integer shoppingListId) {
		return ordersRepo.findByShoppingListId(shoppingListId);
	}

	public List<OrderModel> getOrdersAfterOrderDate(Map<String, Long> interval) {
		Date first = new Date(interval.get("first"));
		Date last = new Date(interval.get("last"));
		return ordersRepo.findByOrderDateBetween(first, last);
	}

	public List<OrderModel> getOrdersBetweenDeliveryDates(Map<String, Long> interval) {
		Date first = new Date(interval.get("first"));
		Date last = new Date(interval.get("last"));
		return ordersRepo.findByDeliveryDateBetween(first, last);
	}

	public OrderModel addOrder(OrderModel order) {
		return ordersRepo.save(order);
	}

	public OrderModel getOrder(Integer id) {
		return ordersRepo.findById(id).get();
	}

	public void deleteOrder(Integer id) {
		shoppingListRepo.removeOrder(id);					//workaround for MySQL trigger restriction
		ordersRepo.deleteById(id);
	}

	public OrderModel updateOrder(Integer id, OrderModel order) {
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

	public Page<OrderModel> getOrdersPageable(
			Integer page,
			Integer size,
			String prop,
			String dir) {
		//Sort sort = sortBy(OrderModel.class, prop, dir);
		Sort sort = OrderModel.sortBy(prop, dir);
		return ordersRepo.findAll(PageRequest.of(page, size, sort));
	}

	public Page<OrderModel> getOrdersByStatusRange(
			StatusModel status,
			Integer page,
			Integer size,
			String prop,
			String dir) {
		Sort sort = OrderModel.sortBy(prop, dir);
		return ordersRepo.findByStatus(status, PageRequest.of(page, size, sort));
	}

	public Page<OrderModel> getOrdersByShoppingListIdPageable(Integer shoppingListId, Integer page, Integer size) {
		return ordersRepo.findByShoppingListId(shoppingListId, PageRequest.of(page, size));
	}

	public Page<OrderModel> getOrdersAfterOrderDatePageable(
			Map<String, Long> interval,
			Integer page,
			Integer size,
			String prop,
			String dir) {
		Date first = new Date(interval.get("first"));
		Date last = new Date(interval.get("last"));
		Sort sort = OrderModel.sortBy(prop, dir);
		return ordersRepo.findByOrderDateBetween(first, last, PageRequest.of(page, size, sort));
	}

	public Page<OrderModel> getOrdersBetweenDeliveryDatesPageable(
			Map<String, Long> interval,
			Integer page,
			Integer size,
			String prop,
			String dir) {
		Date first = new Date(interval.get("first"));
		Date last = new Date(interval.get("last"));
		Sort sort = OrderModel.sortBy(prop, dir);
		return ordersRepo.findByDeliveryDateBetween(first, last, PageRequest.of(page, size, sort));
	}


	//ORDER DETAILS

	public List<OrdersDetailsModel> getDetails(Integer id) {
		OrderModel order = ordersRepo.findById(id).get();
		return detailsRepo.findByOrder(order);
	}

	public OrdersDetailsModel addDetails(Integer id, OrdersDetailsModel details) {
		OrderModel order = ordersRepo.findById(id).get();
		RecipeModel recipe = recipesRepo.findById(details.getRecipe().getId()).get();
		details.setOrder(order);
		details.setRecipe(recipe);
		return detailsRepo.save(details);
	}

	public void deleteDetails(Integer id, OrdersDetailsModel details) {
		OrderModel order = ordersRepo.findById(id).get();
		Integer recipeId = details.getRecipe().getId();
		RecipeModel recipe = recipesRepo.findById(recipeId).get();

		details = detailsRepo.findByOrderAndRecipe(order, recipe);
		detailsRepo.delete(details);
	}

	public OrdersDetailsModel updateDetailsServings(Integer id, OrdersDetailsModel details) {
		OrderModel order = ordersRepo.findById(id).get();
		Integer recipeId = details.getRecipe().getId();
		RecipeModel recipe = recipesRepo.findById(recipeId).get();
		Integer servings = details.getServings();

		details = detailsRepo.findByOrderAndRecipe(order, recipe);
		details.setServings(servings);
		return detailsRepo.save(details);
	}

}
