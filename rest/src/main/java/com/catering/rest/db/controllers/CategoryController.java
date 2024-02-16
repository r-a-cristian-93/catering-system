package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.CategoryModel;
import com.catering.rest.db.services.CategoryService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("category")
public class CategoryController {
	private final CategoryService categoryService;

	@GetMapping
	public List<CategoryModel> getCategory() {
		return categoryService.getCategory();
	}

}
