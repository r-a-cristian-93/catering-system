package com.catering.rest.db.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.catering.rest.db.models.OrderModel;
import com.catering.rest.db.models.StatusModel;

public interface OrdersRepository extends PagingAndSortingRepository<OrderModel, Integer> {
	List<OrderModel> findByStatus(StatusModel status);
	List<OrderModel> findByOrderDateBetween(Date first, Date last);
	List<OrderModel> findByDeliveryDateBetween(Date first, Date last);	
	List<OrderModel> findByShoppingListId(Integer shopingListId);
	
	Page<OrderModel> findByStatus(StatusModel status, Pageable pageable);
	Page<OrderModel> findByOrderDateBetween(Date first, Date last, Pageable pageable);
	Page<OrderModel> findByDeliveryDateBetween(Date first, Date last, Pageable pageable);	
	Page<OrderModel> findByShoppingListId(Integer shopingListId, Pageable pageable);
}
