function buildAppointmentService({ appointmentRepo, clock }) {
  return {
    // Caso de uso: programar cita para un paciente.
    // Regla 1: la cita debe ser en el futuro.
    // Regla 2: no debe existir conflicto de horario para ese paciente.
    async scheduleAppointment({ patientId, startsAt }) {
      // Se usa clock inyectado para hacer pruebas deterministicas.
      const now = clock.now();
      if (startsAt <= now) {
        throw new Error("APPOINTMENT_MUST_BE_FUTURE");
      }

      // Consulta de conflicto (normalmente en DB, aqui depende del repo inyectado).
      const hasConflict = await appointmentRepo.hasConflict(patientId, startsAt);
      if (hasConflict) {
        throw new Error("APPOINTMENT_CONFLICT");
      }

      // Si pasa validaciones, se guarda la cita.
      return appointmentRepo.save({ patientId, startsAt });
    }
  };
}

module.exports = { buildAppointmentService };
