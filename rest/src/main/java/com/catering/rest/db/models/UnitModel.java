package com.catering.rest.db.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="units")
@Getter @Setter
public class UnitModel {
	@Id
	private String name;
	
	protected UnitModel() {}
}