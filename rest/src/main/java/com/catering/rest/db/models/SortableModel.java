package com.catering.rest.db.models;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Sort;

import com.catering.rest.Constants;

public  class SortableModel {	
	public static Class<?> clazz;
	
	public static Sort sortBy(String prop, String dir) {
		Sort.Direction direction;
		
		try {
			BeanUtils.getPropertyDescriptor(clazz, prop).getName();
		}
		catch (Exception e) {		
			prop = Constants.FALLBACK_COLUMN;
			e.printStackTrace();
		}
		try {
			direction = Sort.Direction.valueOf(dir);
		}
		catch(Exception e) {
			direction = Sort.Direction.valueOf(Constants.FALLBACK_DIRECTION);
			e.printStackTrace();
		}
		
		return Sort.by(direction, prop);
	}
}