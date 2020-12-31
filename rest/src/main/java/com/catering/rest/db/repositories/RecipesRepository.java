package com.catering.rest.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.RecipeModel;

public interface RecipesRepository extends JpaRepository<RecipeModel, Integer>{
	
}
