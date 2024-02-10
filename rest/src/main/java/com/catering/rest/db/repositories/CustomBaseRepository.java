package com.catering.rest.db.repositories;

import javax.persistence.EntityManager;

import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

public class CustomBaseRepository<T, ID> extends SimpleJpaRepository<T, ID> {
	private final EntityManager entityManager;
	private final JpaEntityInformation<T, ?> entityInformation;

	CustomBaseRepository(JpaEntityInformation<T, ?>  entityInformation, EntityManager entityManager) {
		super(entityInformation, entityManager);
		this.entityManager = entityManager;
		this.entityInformation = entityInformation;
	}

	@Transactional
	@Override
	public <S extends T> S save(S entity) {
		if (entityInformation.isNew(entity)) {
			entityManager.persist(entity);
			entityManager.refresh(entity);
			return entity;
		} else {
			return entityManager.merge(entity);
		}
	}
}