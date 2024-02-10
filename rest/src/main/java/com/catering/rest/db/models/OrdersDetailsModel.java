package com.catering.rest.db.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="orders_details")
@Getter @Setter
public class OrdersDetailsModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Integer id;

	@Column(name="ID_order")
	private Integer orderId;

	@ManyToOne
	@JoinColumn(name="ID_recipe")
	private RecipeModel recipe;

	private Integer servings;

	protected OrdersDetailsModel() {}
}
