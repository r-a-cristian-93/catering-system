package com.catering.rest.db.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="recipes_details")
@Getter @Setter
@AllArgsConstructor
@ToString
public class RecipesDetailsModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="ID_recipe")
	private RecipeModel recipe;
		
	@ManyToOne
	@JoinColumn(name="ID_ingredient")
	private IngredientModel ingredient;
	
	@Column(name="quantity")
	private Integer quantity;
	
	protected RecipesDetailsModel() {}
}