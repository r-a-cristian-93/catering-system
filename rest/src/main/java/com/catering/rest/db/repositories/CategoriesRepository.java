package com.catering.rest.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.CategoryModel;

public interface CategoriesRepository extends JpaRepository<CategoryModel, Integer> {

}
