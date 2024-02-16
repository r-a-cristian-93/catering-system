package com.catering.rest.db.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.CategoryModel;
import com.catering.rest.db.repositories.CategoriesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    @Autowired
    private final CategoriesRepository categoryRepo;

    public List<CategoryModel> getCategory() {
        return categoryRepo.findAll();
    }

}
