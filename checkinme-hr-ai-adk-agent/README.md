# CheckinMe HR AI Assistant

## 1. Project Overview

This project implements an HR AI Assistant designed to handle employee-related queries across multiple HR domains. The system is built using the Gemini API and follows a modular, agent-based architecture.

The assistant supports queries related to:

- Attendance management  
- Leave requests and balances  
- Payroll and salary inquiries  
- Employee scheduling  
- Field operations (GPS tracking, mobile staff activity)  

The system integrates structured prompt engineering and context-aware response generation to simulate real-world HR assistance in a scalable and maintainable manner.

---

## 2. System Architecture

The system is designed using a root agent that delegates tasks to specialized sub-agents based on the query domain.

### High-Level Flow

```
root_agent (CheckinMe HR Assistant)
    ├── AttendanceAgent   → check-in/out,QR codes,overtime,Telegram alerts
    ├── LeaveAgent        → leave requests, balances, approvals
    ├── PayrollAgent      → salary, payroll runs, deductions
    └── FieldAgent        → GPS tracking, field activity for sales teams
```

### Architectural Design

- The **Root Agent** acts as the central controller  
- Each **Sub-Agent** is responsible for a specific HR domain  
- Tools provide domain-specific logic and sample data  
- The LLM generates responses based on structured prompts and injected context  

---

## 3. Project Structure

```
.
└── checkinme-hr-ai-adk-agent/
    ├── .env                # Store API Key
    ├── .gitignore
    ├── requirements.txt    # Dependencies list
    └── checkinme/          # ADK agent package
        ├── __init__.py     # required by ADK
        ├── agent.py        # root agent + all sub-agents
        └── tools/
            ├── attendance_tools.py # check-in/out, QR, overtime
            ├── leave_tools.py      # leave requests, balance 
            ├── payroll_tools.py    # payroll, salary queries
            ├── schedule_tools.py   # staff scheduling  
            └── field_tools.py      # GPS, field activity (sales)
```

---

## 5. Context Management

The system uses structured prompt engineering to ensure consistent and accurate responses.

### Prompt Structure

- System Instruction (HR Assistant role)
- Domain-Specific Context (HR data)
- User Query

`NOTE`: The instruction & data i provided to Agent are just a sample which i got from the AI as well but all are aligned with the CheckinMe features & contexts.

This approach ensures responses are grounded in relevant HR policies and reduces hallucination.

---

## 6. Key Features

- Multi-domain HR query handling  
- Agent-based task delegation  
- Context-aware response generation  
- Modular and extensible design  
- Integration with LLM via API  

---

## 7. Example Usage

| Test Prompt                                                                 | Process                                 | Agent Action                                |
| --------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------- |
| What is the attendance for employee EMP001 on 2025-04-01?                   | attendance_agent → get_employee_attendance      | get_employee_attendance                     |
| How many people are present in the Sales department today?                  | attendance_agent → get_team_attendance_summary  | get_team_attendance_summary                 |
| How much overtime did EMP003 work in March 2025?                             | attendance_agent → calculate_overtime           | calculate_overtime                          |
| What is the leave balance for EMP007?                                       | leave_agent → get_leave_balance                 | get_leave_balance                            |
| Submit annual leave for EMP002 from April 10 to April 14, reason: family trip | leave_agent → submit_leave_request             | submit_leave_request                         |
| What is the maternity leave policy?                                         | leave_agent → get_leave_policy                  | get_leave_policy                             |
| Show me the payslip for EMP001 for March 2025                                | payroll_agent → get_payroll_summary             | get_payroll_summary                          |
| Where did sales rep EMP015 visit on April 1?                                 | field_agent → get_field_activity                | get_field_activity                           |
| Give me the full field report for the sales team today                       | field_agent → get_sales_team_field_report       | get_sales_team_field_report                  |

## 8. Setup Instructions

### Clone Repository

```
git clone https://github.com/PunleuTY/CheckinMe-Assignment-AI-Assistance.git
cd checkinme-hr-ai-adk-agent
```

### Install Dependencies

```
pip install -r requirements.txt
```

### Configure Environment

Create a `.env` file:

```
GOOGLE_API_KEY=your_api_key_here
```

---

## 9. Run the Application

```
adk web
```
