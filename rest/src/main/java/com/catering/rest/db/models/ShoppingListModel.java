package com.catering.rest.db.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class ShoppingListModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Integer id;

	@ManyToOne
	@JoinColumn(name="ID_ingredient")
	private IngredientModel ingredient;

	@Column
	private Double quantity;

	protected ShoppingListModel() {}
}