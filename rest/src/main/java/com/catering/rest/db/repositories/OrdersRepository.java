package com.catering.rest.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.OrderModel;

public interface OrdersRepository extends JpaRepository<OrderModel, Integer> {
	
}
