package com.devsuperior.dsmeta.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsmeta.dto.SaleDTO;
import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.repositories.SaleRepository;
import com.devsuperior.dsmeta.services.exceptions.DatabaseException;
import com.devsuperior.dsmeta.services.exceptions.ResourceNotFoundException;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository repository;

	@Transactional(readOnly = true)
	public Page<Sale>findSales(String minDate, String maxDate, Pageable pageable) {
		
		LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		
		LocalDate min = minDate.equals("") ? today.minusDays(365) : LocalDate.parse(minDate);
		LocalDate max = maxDate.equals("") ? today : LocalDate.parse(maxDate);
		
		return repository.findSales(min, max, pageable); 
	}
	
	@Transactional(readOnly = true)
	public SaleDTO findById(Long id) {
		Optional<Sale> obj = repository.findById(id);
		Sale entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new SaleDTO(entity);
	}

	@Transactional
	public SaleDTO insert(SaleDTO dto) {
		Sale entity = new Sale();
		entity.setId(dto.getId());
		entity.setSellerName(dto.getSellerName());
		entity.setVisited(dto.getVisited());
		entity.setDeals(dto.getDeals());
		entity.setAmount(dto.getAmount());
		entity.setDate(dto.getDate());
		entity = repository.save(entity);
		return new SaleDTO(entity);
	}
	
	
	@Transactional
	public SaleDTO update(Long id, SaleDTO dto){
		try {
			Sale entity = repository.getReferenceById(id);
			entity.setId(dto.getId());
			entity.setSellerName(dto.getSellerName());
			entity.setVisited(dto.getVisited());
			entity.setDeals(dto.getDeals());
			entity.setAmount(dto.getAmount());
			entity.setDate(dto.getDate());
			entity = repository.save(entity);
			return new SaleDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
}
