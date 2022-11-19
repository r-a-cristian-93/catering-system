package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.CategoryModel;
import com.catering.rest.db.services.CategoriesService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("categories")
public class CategoriesController {
    @Autowired
    private final CategoriesService categoriesService;

    @GetMapping
    public  List<CategoryModel> getCategories() {
        return categoriesService.getCategories();
    }

}
