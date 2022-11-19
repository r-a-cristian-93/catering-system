package com.catering.rest.db.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.CategoryModel;
import com.catering.rest.db.repositories.CategoriesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoriesService {
    @Autowired
    private final CategoriesRepository categoriesRepo;

    public List<CategoryModel> getCategories() {
        return categoriesRepo.findAll();
    }

}
