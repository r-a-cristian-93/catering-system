package com.catering.rest.db.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.IngredientPriceHistoryModel;

public interface IngredientsPriceHistoryRepository extends JpaRepository<IngredientPriceHistoryModel, Integer>{
    List<IngredientPriceHistoryModel> findByIngredientId(Integer ingredientId);
}
