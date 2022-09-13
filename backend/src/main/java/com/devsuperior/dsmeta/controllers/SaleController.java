package com.devsuperior.dsmeta.controllers;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dsmeta.dto.SaleDTO;
import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.services.SaleService;
import com.devsuperior.dsmeta.services.SmsService;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {
	
	@Autowired
	private SaleService service;
	
	@Autowired
	private SmsService smsService;
	
	@GetMapping
	public Page<Sale> findSales(
			@RequestParam(value="minDate", defaultValue = "") String minDate,
			@RequestParam(value="maxDate", defaultValue = "")String maxDate,
			Pageable pageable){
		return service.findSales(minDate, maxDate, pageable);
	}

	@GetMapping("{id}/notification")
	public void notifySms(@PathVariable Long id) {
		smsService.sendSms(id);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<SaleDTO> findById(@PathVariable Long id) {
		SaleDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<SaleDTO> insert(@RequestBody @Valid SaleDTO dto) {
		SaleDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(newDto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<SaleDTO> update(@PathVariable Long id, @RequestBody @Valid SaleDTO dto) {
		SaleDTO newDto = service.update(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
