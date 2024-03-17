package com.catering.rest.db.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="clients_addresses")
@Getter @Setter
public class ClientAddressModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Integer id;

	@Column(name="ID_client")
	private Integer clientId;

    @Column(name="value")
    private String value;

	@Column(name="latitude")
	private Float latitude;

	@Column(name="longitude")
	private Float longitude;

	protected ClientAddressModel() {}
}
