package com.catering.rest.db.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.OrderModel;
import com.catering.rest.db.models.StatusModel;

public interface OrdersRepository extends JpaRepository<OrderModel, Integer> {
	List<OrderModel> findByStatus(StatusModel status);
	List<OrderModel> findByOrderDateBetween(Date first, Date last);
	List<OrderModel> findByDeliveryDateBetween(Date first, Date last);	
}
