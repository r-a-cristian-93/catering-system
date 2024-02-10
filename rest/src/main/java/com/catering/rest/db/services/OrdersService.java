package com.catering.rest.db.services;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.ClientAddressModel;
import com.catering.rest.db.models.ClientModel;
import com.catering.rest.db.models.OrderModel;
import com.catering.rest.db.models.OrdersDetailsModel;
import com.catering.rest.db.models.RecipeModel;
import com.catering.rest.db.models.ReportByDateModel;
import com.catering.rest.db.models.StatusModel;
import com.catering.rest.db.reports.OrdersReportDate;
import com.catering.rest.db.repositories.OrdersRepository;
import com.catering.rest.db.repositories.ClientsRepository;
import com.catering.rest.db.repositories.OrdersDetailsRepository;
import com.catering.rest.db.repositories.RecipesRepository;

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
	private final OrdersReportDate ordersReportDate;

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
		return ordersRepo.findByPlacementDateBetween(first, last);
	}

	public List<OrderModel> getOrdersBetweenDeliveryDates(Map<String, Long> interval) {
		Date first = new Date(interval.get("first"));
		Date last = new Date(interval.get("last"));
		return ordersRepo.findByPlacementDateBetween(first, last);
	}

	public OrderModel addOrder(OrderModel order) {
		return ordersRepo.save(order);
	}

	public OrderModel getOrder(Integer id) {
		return ordersRepo.findById(id).get();
	}

	public void deleteOrder(Integer id) {
		ordersRepo.deleteById(id);
	}

	public OrderModel updateOrder(Integer id, OrderModel order) {
		ClientModel client = order.getClient();
		StatusModel status = order.getStatus();
		Date placementDate = order.getPlacementDate();
		Date dueDate = order.getDueDate();
		Date supplyDate = order.getSupplyDate();
		Date productionDate = order.getProductionDate();
		Date preparingDate = order.getPreparingDate();
		Date shippingDate = order.getShippingDate();
		Date cancelDate = order.getCancelDate();
		ClientAddressModel deliveryAddress = order.getDeliveryAddress();
		order = ordersRepo.findById(id).get();

		if(client!=null) {
			client = clientsRepo.findByName(client.getName());
			order.setClient(client);
		}
		if(status!=null) {
			order.setStatus(status);
		}
		if(placementDate!=null) {
			order.setPlacementDate(placementDate);
		}
		if (dueDate != null) {
			order.setDueDate(dueDate);
		}
		if (supplyDate != null) {
			order.setSupplyDate(supplyDate);
		}
		if (productionDate != null) {
			order.setProductionDate(productionDate);
		}
		if (preparingDate != null) {
			order.setPreparingDate(preparingDate);
		}
		if (shippingDate != null) {
			order.setShippingDate(shippingDate);
		}
		if(cancelDate != null) {
			order.setCancelDate(cancelDate);
		}
		if(deliveryAddress!=null) {
			order.setDeliveryAddress(deliveryAddress);
		}

		return ordersRepo.save(order);
	}

	public OrderModel nextStep(Integer id) {
		return ordersRepo.nextStep(id);
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
		return ordersRepo.findByPlacementDateBetween(first, last, PageRequest.of(page, size, sort));
	}

	public Page<OrderModel> getOrdersBetweenDueDatesPageable(
			Map<String, Long> interval,
			Integer page,
			Integer size,
			String prop,
			String dir) {
		Date first = new Date(interval.get("first"));
		Date last = new Date(interval.get("last"));
		Sort sort = OrderModel.sortBy(prop, dir);
		return ordersRepo.findByDueDateBetween(first, last, PageRequest.of(page, size, sort));
	}


	//ORDER DETAILS

	public List<OrdersDetailsModel> getDetails(Integer orderId) {
		return detailsRepo.findByOrderId(orderId);
	}

	public OrdersDetailsModel addDetails(Integer orderId, OrdersDetailsModel details) {
		RecipeModel recipe = recipesRepo.findById(details.getRecipe().getId()).get();
		details.setOrderId(orderId);
		details.setRecipe(recipe);
		return detailsRepo.save(details);
	}

	public boolean deleteDetails(Integer orderId, OrdersDetailsModel details) {
		Integer recipeId = details.getRecipe().getId();
		RecipeModel recipe = recipesRepo.findById(recipeId).get();

		details = detailsRepo.findByOrderIdAndRecipe(orderId, recipe);
		detailsRepo.delete(details);

		return true;
	}

	public OrdersDetailsModel updateDetailsServings(Integer orderId, OrdersDetailsModel details) {
		Integer recipeId = details.getRecipe().getId();
		RecipeModel recipe = recipesRepo.findById(recipeId).get();
		Integer servings = details.getServings();

		details = detailsRepo.findByOrderIdAndRecipe(orderId, recipe);
		details.setServings(servings);
		return detailsRepo.save(details);
	}

	public List<ReportByDateModel> getReportOfPlacementDate(Date startDate, Date endDate) {
		return ordersReportDate.placementDate(startDate, endDate);
	}

	public List<ReportByDateModel> getReportOfDueDate(Date startDate, Date endDate) {
		return ordersReportDate.dueDate(startDate, endDate);
	}

	public List<ReportByDateModel> getReportOfCancelDate(Date startDate, Date endDate) {
		return ordersReportDate.cancelDate(startDate, endDate);
	}

	public List<ReportByDateModel> getReportOfShippingDate(Date startDate, Date endDate) {
		return ordersReportDate.shippingDate(startDate, endDate);
	}
}
