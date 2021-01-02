package com.catering.rest.db.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="status")
@Getter @Setter
public class StatusModel {
	@Id
	private String name;
	
	protected StatusModel() {}
}
