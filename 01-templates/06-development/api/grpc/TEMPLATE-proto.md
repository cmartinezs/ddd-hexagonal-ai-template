[← Index](./README.md)

---

# Protocol Buffer Template

## Purpose

Template for documenting gRPC services and messages.

## Proto Template

```protobuf
syntax = "proto3";

package myapp.api.v1;

option go_package = "myapp/api/v1";

// === Messages ===

message User {
  string id = 1;
  string email = 2;
  string name = 3;
  UserStatus status = 4;
  int64 created_at = 5;
  int64 updated_at = 6;
}

enum UserStatus {
  USER_STATUS_UNSPECIFIED = 0;
  USER_STATUS_PENDING = 1;
  USER_STATUS_ACTIVE = 2;
  USER_STATUS_SUSPENDED = 3;
}

message CreateUserRequest {
  string email = 1;
  string password = 2;
  string name = 3;
}

message CreateUserResponse {
  User user = 1;
}

message GetUserRequest {
  string id = 1;
}

message GetUserResponse {
  User user = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
}

message ListUsersResponse {
  repeated User users = 1;
  string next_page_token = 2;
}

// === Service ===

service UserService {
  // Create a new user
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);
  
  // Get user by ID
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  
  // List users with pagination
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);
  
  // Stream user updates
  rpc StreamUsers(google.protobuf.Empty) returns (stream UserEvent);
}

message UserEvent {
  UserEventType type = 1;
  User user = 2;
  int64 timestamp = 3;
}

enum UserEventType {
  USER_EVENT_TYPE_UNSPECIFIED = 0;
  USER_EVENT_TYPE_CREATED = 1;
  USER_EVENT_TYPE_UPDATED = 2;
  USER_EVENT_TYPE_DELETED = 3;
}
```

## Error Handling

```protobuf
// Standard error response
message Error {
  int32 code = 1;
  string message = 2;
  repeated ErrorDetail details = 3;
}

message ErrorDetail {
  string field = 1;
  string message = 2;
}

// Usage in service
service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse) {
    option (google.api.http) = "/api/v1/users/{id}";
  }
}
```

## Streaming Examples

### Server Streaming

```protobuf
rpc WatchUsers(WatchUsersRequest) returns (stream UserUpdate);

message WatchUsersRequest {
  string filter = 1;
}

message UserUpdate {
  User user = 1;
  UpdateType type = 2;
}
```

### Bidirectional Streaming

```rpc Chat(stream ChatMessage) returns (stream ChatMessage);
```

---

[← Index](./README.md)