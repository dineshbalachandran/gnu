package com.dineshkb.gnu.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import javax.persistence._
import javax.validation.constraints.NotNull

import scala.beans.BeanProperty

@Entity
@Table(name="RELEASE_PACKAGE")
@JsonIgnoreProperties(ignoreUnknown=true)
class ReleasePackage {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @BeanProperty
  @Column(name = "id")
  var id: java.lang.Long = _
  @BeanProperty @NotNull
  @Column(name = "description")
  var description: String = _
  @BeanProperty @NotNull
  @Column(name = "source")
  var source: String = _
  @BeanProperty @NotNull
  @Column(name = "status")
  var status: String = _
  @BeanProperty @NotNull
  @Column(name = "created_on")
  var createdOn: java.time.LocalDate = _
  @BeanProperty @NotNull
  @Column(name = "created_by")
  var createdBy: String = _
  @BeanProperty
  @Column(name = "committed_on")
  var committedOn: java.time.LocalDate = _
  @BeanProperty
  @Column(name = "committed_by")
  var committedBy: String = _
  @BeanProperty
  @OneToOne
  @JoinColumn(name = "tag_no")
  var tag: Tag = _
  @BeanProperty
  @Column(name = "updated_at")
  var updatedAt: java.time.LocalDateTime = java.time.LocalDateTime.now()
}
