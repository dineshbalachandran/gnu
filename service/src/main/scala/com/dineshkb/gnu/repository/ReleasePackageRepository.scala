package com.dineshkb.gnu.repository

import com.dineshkb.gnu.model.ReleasePackage
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
trait ReleasePackageRepository extends CrudRepository[ReleasePackage, java.lang.Long]
