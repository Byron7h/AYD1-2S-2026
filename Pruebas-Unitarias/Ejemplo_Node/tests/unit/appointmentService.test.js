const { buildAppointmentService } = require("../../src/appointmentService");

// Fake: repositorio en memoria.
// Sirve para simular DB sin conectarse a una DB real.
class FakeAppointmentRepo {
  constructor(seed = []) {
    this.items = [...seed];
  }

  async hasConflict(patientId, startsAt) {
    return this.items.some(
      (item) => item.patientId === patientId && item.startsAt.getTime() === startsAt.getTime()
    );
  }

  async save({ patientId, startsAt }) {
    const saved = { id: this.items.length + 1, patientId, startsAt };
    this.items.push(saved);
    return saved;
  }
}

describe("AppointmentService unit tests", () => {
  test("creates appointment when date is in the future (using stub + fake)", async () => {
    // Caso real: paciente agenda cita futura y no tiene conflicto.
    // Queremos validar la regla de negocio sin usar reloj real ni DB real.

    // Stub: reloj fijo para volver la prueba deterministica.
    const fixedNow = new Date("2026-03-23T10:00:00.000Z");
    const clockStub = { now: () => fixedNow };

    // Fake repo en memoria para guardar y consultar citas.
    const fakeRepo = new FakeAppointmentRepo();
    const service = buildAppointmentService({
      appointmentRepo: fakeRepo,
      clock: clockStub
    });

    // Act: ejecutar caso de uso de agendar.
    const result = await service.scheduleAppointment({
      patientId: 33,
      startsAt: new Date("2026-03-23T11:00:00.000Z")
    });

    // Assert:
    // 1) salida esperada: cita guardada con id
    // 2) validacion: el fake repo tiene 1 registro
    expect(result.id).toBe(1);
    expect(result.patientId).toBe(33);
    expect(fakeRepo.items).toHaveLength(1);
  });

  test("throws APPOINTMENT_CONFLICT when same patient already has appointment", async () => {
    // Caso de falla: ya existe una cita para el mismo paciente y misma hora.
    const existingDate = new Date("2026-03-23T11:00:00.000Z");
    const fakeRepo = new FakeAppointmentRepo([{ id: 1, patientId: 33, startsAt: existingDate }]);

    const service = buildAppointmentService({
      appointmentRepo: fakeRepo,
      clock: { now: () => new Date("2026-03-23T10:00:00.000Z") }
    });

    // Salida esperada: error de conflicto.
    await expect(
      service.scheduleAppointment({ patientId: 33, startsAt: existingDate })
    ).rejects.toThrow("APPOINTMENT_CONFLICT");
  });
});
