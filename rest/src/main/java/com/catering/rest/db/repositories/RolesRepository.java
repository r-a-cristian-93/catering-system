package com.catering.rest.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.RoleModel;

public interface RolesRepository extends JpaRepository<RoleModel, String>{

}
