package com.catering.rest.db.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="orders")
@Getter @Setter
@DynamicUpdate
@DynamicInsert
public class OrderModel {
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
	
	protected OrderModel() {}
}