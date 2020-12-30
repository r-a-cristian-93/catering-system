package com.catering.rest.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.IngredientModel;

public interface IngredientsRepository extends JpaRepository<IngredientModel, Integer>{

}
