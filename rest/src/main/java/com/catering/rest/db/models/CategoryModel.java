package com.catering.rest.db.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="recipes_categories")
@Getter @Setter
public class CategoryModel {
    @Id
    private String name;

    protected CategoryModel() {}
}
