package com.catering.rest.db.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="roles")
@Getter @Setter
public class RoleModel {
	@Id
	private String name;
	
	protected RoleModel() {}
}
