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
import lombok.ToString;

@Entity
@Table(name="ingredients_price_history")
@Getter @Setter
@DynamicInsert
@DynamicUpdate
@ToString
public class IngredientPriceHistoryModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Integer id;

	@ManyToOne
	@JoinColumn(name="ID_ingredient")
	private Integer ingredientId;

	@Column(name="price")
	private Double price;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date")
	private Date date;

	protected IngredientPriceHistoryModel() {}
}
