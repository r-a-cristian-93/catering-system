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
import lombok.ToString;

@Entity
@Table(name="ingredients")
@Getter @Setter
@DynamicInsert
@DynamicUpdate
@ToString
public class IngredientModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Integer id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="price")
	private Double price;
	
	@ManyToOne
	@JoinColumn(name="unit")
	private UnitModel unit;
	
	protected IngredientModel() {}
}
