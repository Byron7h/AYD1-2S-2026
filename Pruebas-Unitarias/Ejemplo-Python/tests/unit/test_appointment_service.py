from datetime import datetime

import pytest

from src.appointment_service import AppointmentService


class FakeAppointmentRepo:
    def __init__(self, seed=None):
        # Fake repo: almacenamiento en memoria de citas.
        # Simula persistencia sin levantar DB real.
        self.items = list(seed or [])

    def has_conflict(self, patient_id, starts_at):
        return any(
            item["patient_id"] == patient_id and item["starts_at"] == starts_at
            for item in self.items
        )

    def save(self, payload):
        saved = {
            "id": len(self.items) + 1,
            "patient_id": payload["patient_id"],
            "starts_at": payload["starts_at"],
        }
        self.items.append(saved)
        return saved


class ClockStub:
    def __init__(self, fixed_now):
        # Stub de reloj: retorna un tiempo fijo para pruebas deterministicas.
        self.fixed_now = fixed_now

    def now(self):
        return self.fixed_now


def test_creates_appointment_when_future_and_no_conflict():
    # Arrange: tiempo fijo y repo vacio.
    # Aqui usamos Stub (clock) + Fake (repo) en el mismo test.
    fixed_now = datetime(2026, 3, 23, 10, 0, 0)
    clock = ClockStub(fixed_now)

    repo = FakeAppointmentRepo()
    service = AppointmentService(repo, clock)

    # Act: ejecutar la regla de negocio.
    result = service.schedule_appointment(
        patient_id=33,
        starts_at=datetime(2026, 3, 23, 11, 0, 0),
    )

    # Assert: se valida salida y estado interno del fake.
    assert result["id"] == 1
    assert result["patient_id"] == 33
    assert len(repo.items) == 1


def test_throws_conflict_when_same_patient_same_time():
    # Arrange: repo con cita existente en la misma hora.
    # Seed data permite preparar escenarios sin pasos previos.
    existing = datetime(2026, 3, 23, 11, 0, 0)
    repo = FakeAppointmentRepo(
        [{"id": 1, "patient_id": 33, "starts_at": existing}]
    )
    clock = ClockStub(datetime(2026, 3, 23, 10, 0, 0))

    service = AppointmentService(repo, clock)

    # Act + Assert: esperamos error de conflicto de dominio.
    with pytest.raises(ValueError, match="APPOINTMENT_CONFLICT"):
        service.schedule_appointment(patient_id=33, starts_at=existing)
