import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { AddressService } from './address-service';

describe('AddressService', () => {
  it('converte a lista de estados recebida pela API', () => {
    const service = TestBed.inject(AddressService);
    const http = TestBed.inject(HttpTestingController);
    let states: unknown;

    service.getStates().subscribe((result) => (states = result));

    const request = http.expectOne((request) => request.url.endsWith('/victor/endereco/estados'));
    expect(request.request.method).toBe('GET');
    request.flush({ data: [{ sigla: 'SP', nome: 'São Paulo' }] });

    expect(states).toEqual([{ abbreviated: 'SP', name: 'São Paulo' }]);
    http.verify();
  });

  it('converte um CEP encontrado em endereço parcial', () => {
    const service = TestBed.inject(AddressService);
    const http = TestBed.inject(HttpTestingController);
    let address: unknown;

    service.getAddressByZipCode('01001-000').subscribe((result) => (address = result));

    const request = http.expectOne((request) =>
      request.url.endsWith('/victor/endereco/localidade/cep'),
    );
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ cep: '01001-000' });
    request.flush({
      data: {
        bairro: 'Sé',
        cep: '01001-000',
        cidade: 'São Paulo',
        estado: { sigla: 'SP' },
        logradouro: 'Praça da Sé',
      },
    });

    expect(address).toEqual({
      city: 'São Paulo',
      hasZipCode: true,
      neighborhood: 'Sé',
      state: 'SP',
      street: 'Praça da Sé',
    });
    http.verify();
  });

  it('informa CEP não encontrado', () => {
    const service = TestBed.inject(AddressService);
    const http = TestBed.inject(HttpTestingController);
    let address: unknown;

    service.getAddressByZipCode('00000-000').subscribe((result) => (address = result));
    http
      .expectOne((request) => request.url.endsWith('/victor/endereco/localidade/cep'))
      .flush({ data: {} });

    expect(address).toEqual({ hasZipCode: false });
    http.verify();
  });
});
