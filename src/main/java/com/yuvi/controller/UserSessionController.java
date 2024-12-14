package com.yuvi.controller;

import com.yuvi.service.UserSessionService;
import com.yuvi.model.UserSession;
import com.yuvi.enums.SessionStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/sessions")
public class UserSessionController {
    private final UserSessionService sessionService;

    public UserSessionController(UserSessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping
    public ResponseEntity<List<UserSession>> getLiveSessions(
            @RequestParam(required = false) Map<String, Object> filters) {
        try {
            List<UserSession> sessions = sessionService.getSessionsByFilters(filters);
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getSessionStats(
            @RequestParam Long companyId) {
        try {
            Map<String, Object> stats = sessionService.getSessionStats(companyId);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<UserSession> getSessionById(@PathVariable UUID sessionId) {
        try {
            return sessionService.getSession(sessionId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/{sessionId}/status")
    public ResponseEntity<Void> updateSessionStatus(
            @PathVariable UUID sessionId,
            @RequestBody Map<String, String> body) {
        try {
            SessionStatus status = SessionStatus.valueOf(body.get("status"));
            sessionService.updateSessionStatus(sessionId, status);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<UserSession>> getSessionsByCompany(
            @PathVariable Long companyId,
            @RequestParam(required = false) Map<String, Object> filters) {
        try {
            List<UserSession> sessions = sessionService.getActiveSessions(companyId);
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportSessions(
            @RequestParam(required = false) Map<String, Object> filters) {
        try {
            byte[] fileContent = sessionService.exportSessionData(filters);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/vnd.ms-excel")
                    .header("Content-Disposition", "attachment; filename=sessions.xlsx")
                    .body(fileContent);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
} 