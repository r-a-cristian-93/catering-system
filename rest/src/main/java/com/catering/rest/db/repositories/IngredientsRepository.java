package com.catering.rest.db.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.catering.rest.db.models.IngredientModel;

public interface IngredientsRepository extends PagingAndSortingRepository<IngredientModel, Integer>{

}
