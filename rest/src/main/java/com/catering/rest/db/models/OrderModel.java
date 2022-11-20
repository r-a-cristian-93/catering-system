package com.catering.rest.db.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="orders")
@Getter @Setter
@DynamicUpdate
@DynamicInsert
public class OrderModel extends SortableModel{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Integer id;

	@ManyToOne
	@JoinColumn(name="ID_CLIENT")
	private ClientModel client;

	@ManyToOne
	@JoinColumn(name="status")
	private StatusModel status;

	@Column(name="ing_cost")
	private Double ingCost;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="order_date")
	private Date orderDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="delivery_date")
	private Date deliveryDate;

	@Column(name="ID_shopping_list")
	private Integer shoppingListId;

	@ManyToOne
	@JoinColumn(name="ID_delivery_address")
	private AddressModel deliveryAddress;

	protected OrderModel() {}

	static {
		clazz = OrderModel.class;
	}
}
