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
import lombok.ToString;

@Entity
@Table(name="recipes")
@Getter @Setter
@ToString
public class RecipeModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Integer id;
	
	private String name;
	
	private Double quantity;
	
	@ManyToOne
	@JoinColumn(name="unit")
	private UnitModel unit;
	
	@Column(name="ing_cost")
	private Double ingCost;
	
	protected RecipeModel() {}
}
