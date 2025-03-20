# Message Rate Monitoring Web UI

This project is an Angular-based web interface designed for monitoring message processing rates. The UI includes two main sections: **per account** and **per number**, providing real-time insights into message throughput and offering filtering options based on account number and date/time ranges.

## Features

- **Two Sections:**
  - **Per Account**: Displays message processing rates and details per account.
  - **Per Number**: Displays message processing rates and details per number.

- **Real-time Message Processing Metrics:**
  - Displays the rate of messages being processed in messages per second.

- **Filtering Options:**
  - **Per Number**: Filter messages by a specific account or phone number.
  - **Per Date/Time Range**: Filter messages by date and time to view historical processing rates.

## Setup and Configuration

### Prerequisites

Before setting up the project, ensure you have the following installed on your local machine:

- **Node.js** (version 16 or higher)
- **Angular CLI** (install globally if not already installed)
- A **running Web API** service providing the message rate data.

### Installation Steps

1. Clone the repository to your local machine:

    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2. Install the required dependencies using npm:

    ```bash
    npm install
    ```

3. Configure the Web API endpoint. Open the file `src/app/services/rate-limit-service.ts` and update the `apiUrl` variable to point to your Web API:

    ```typescript
    private apiUrl = 'https://localhost:7215/api/Message/';
    ```

    If your Web API is hosted at a different URL, replace `'https://localhost:7215/api/Message/'` with the appropriate URL.

### Running the Application

To start the application locally, run the following command:

```bash
ng serve
